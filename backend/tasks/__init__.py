from invoke import task
import sys
import os

DJANGO_APP_NAME = "tvMaze"


def run_command(ctx, cmd, settings_module="tvMaze.settings"):
    print(f"Executing raw command: {cmd}")
    if sys.platform == "win32":
        return os.system(cmd)
    return ctx.run(
        f'export DJANGO_SETTINGS_MODULE={settings_module} && {cmd}', pty=True
    )


@task
def runserver(ctx):
    """
    Start the Django development server in the Django container.
    """
    run_command(ctx, f"python manage.py runserver")


@task
def makemigrations(ctx):
    """
    Create new database migrations in the Django container.
    """
    run_command(ctx, f"python manage.py makemigrations")


@task
def migrate(ctx):
    """
    Apply database migrations in the Django container.
    """
    run_command(ctx, f"python manage.py migrate")


@task
def prepare_environment(ctx):
    """
    Prepare development environment on local docker stack.
    """
    # run_command(ctx, "docker-compose down")
    # run_command(ctx, f"docker-compose --project-name {DJANGO_APP_NAME} up -d --build")
    makemigrations(ctx)
    migrate(ctx)
    load_data(ctx)


@task
def load_data(ctx):
    """
    Load data from TVMaze API.
    """
    run_command(ctx, f"python manage.py loaddata fixtures/test_data.yaml")
