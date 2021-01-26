import re


def test_salt_version(host, saltvers, installmethod):
    cmd = host.run("salt-call --version")
    if saltvers == "master":
        saltvers = r"3002-n/a-\w{7}"
    elif saltvers == "tiamat":
        saltvers = r"3002.2|3002-\d{3}-\w{8,11}"
    else:
        # Handle version branch when installing from git, remove leading "v"
        # v3001rc1 becomes 3001rc1
        if saltvers.startswith("v") and installmethod == "git":
            saltvers = saltvers[1:]
        # Handle version number when installing a `.0` release, where the `.0`
        # is not present in the `--versions-report` output
        if saltvers.endswith(".0"):
            saltvers = saltvers.replace(".0", "")
    # https://github.com/pytest-dev/pytest-testinfra/issues/369#issuecomment-419763806
    assert re.search(saltvers, cmd.stdout)
    assert cmd.rc == 0


def test_salt_python_version(host, pyvers):
    cmd = host.run("salt-call --versions-report")
    assert "Python: {}".format(pyvers) in cmd.stdout
    assert cmd.rc == 0
