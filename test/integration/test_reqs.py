import pytest


@pytest.mark.parametrize(
    "cmd",
    ["python", "pip"],
)
def test_python(host, pyvers, installmethod, cmd):
    if host.system_info.distribution == "arch":
        python_verstr = "" if pyvers == "3" else pyvers
    elif pyvers == "2":
        python_verstr = ""
    else:
        python_verstr = pyvers
    command = cmd + python_verstr

    if cmd == "pip" and installmethod == "onedir":
        command = "salt-pip"

    host.find_command(command)


@pytest.mark.parametrize(
    "cmd",
    ["git", "netstat", "ps"],
)
def test_reqs(host, cmd):
    host.find_command(cmd)
