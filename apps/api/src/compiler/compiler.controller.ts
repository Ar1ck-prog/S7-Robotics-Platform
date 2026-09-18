import { Body, Controller, Post } from '@nestjs/common';
import { Sandbox } from '@vercel/sandbox';
import { IsIn, IsString, MaxLength } from 'class-validator';

class CompileDto {
  @IsIn(['arduino', 'cpp', 'python', 'micropython'])
  language!: 'arduino' | 'cpp' | 'python' | 'micropython';

  @IsString()
  @MaxLength(12000)
  code!: string;
}

@Controller('compiler')
export class CompilerController {
  @Post('run')
  async run(@Body() dto: CompileDto) {
    let sandbox: Awaited<ReturnType<typeof Sandbox.create>> | null = null;
    try {
      configureVercelSandboxToken();
      sandbox = await Sandbox.create({
        runtime: 'node22',
        timeout: 60_000,
        resources: { vcpus: 1 }
      });
      const source = buildSource(dto.language, dto.code);
      await sandbox.writeFiles([{ path: source.file, content: source.content }]);
      const finished = await sandbox.runCommand(source.command, source.args);
      return {
        ok: finished.exitCode === 0,
        provider: 'vercel-sandbox',
        language: dto.language,
        exitCode: finished.exitCode,
        stdout: await finished.stdout(),
        stderr: await finished.stderr(),
        limits: { timeoutMs: 60000, vcpus: 1 }
      };
    } catch (error) {
      return {
        ok: false,
        provider: 'local-fallback',
        language: dto.language,
        stderr: error instanceof Error ? error.message : 'Vercel Sandbox is not configured',
        hint: 'Run vercel link && vercel env pull locally, or deploy to Vercel with Sandbox enabled.'
      };
    } finally {
      await sandbox?.stop();
    }
  }
}

function configureVercelSandboxToken() {
  if (!process.env.VERCEL_OIDC_TOKEN && process.env.VERCEL_TOKEN) {
    process.env.VERCEL_OIDC_TOKEN = process.env.VERCEL_TOKEN;
  }
}

function buildSource(language: CompileDto['language'], code: string) {
  if (language === 'python' || language === 'micropython') {
    return { file: 'main.py', content: code, command: 'python3', args: ['-m', 'py_compile', 'main.py'] };
  }
  const arduinoShim = `
void pinMode(int, int) {}
void digitalWrite(int, int) {}
void delay(int) {}
void delayMicroseconds(int) {}
long pulseIn(int, int) { return 0; }
struct SerialShim { void begin(int) {} template<typename T> void print(T) {} template<typename T> void println(T) {} } Serial;
#define HIGH 1
#define LOW 0
#define INPUT 0
#define OUTPUT 1
`;
  return {
    file: 'main.cpp',
    content: language === 'arduino' ? `${arduinoShim}\n${code}` : code,
    command: 'g++',
    args: ['-std=c++17', '-fsyntax-only', 'main.cpp']
  };
}
