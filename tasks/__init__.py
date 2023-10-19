from invoke import task
import sys
import os


def run_command(ctx, cmd, settings_module="tvMaze.settings"):
    print(f"Executing raw command: {cmd}")
    if sys.platform == "win32":
        return os.system(cmd)
    return ctx.run(
        f'export DJANGO_SETTINGS_MODULE={settings_module} && {cmd}', pty=True
    )


@task
def runserver(ctx):
    run_command(ctx, "python backend/manage.py runserver")


@task
def makemigrations(ctx):
    run_command(ctx, "python backend/manage.py makemigrations")


@task
def migrate(ctx):
    run_command(ctx, "python backend/manage.py migrate")