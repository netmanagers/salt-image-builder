def test_salt_version(host, saltvers, installmethod):
    cmd = host.run("salt-call --version")
    if saltvers in ["latest", "master", "tiamat"]:
        saltvers = "3002"
    # Handle version branch when installing from git, remove leading "v"
    # v3001rc1 becomes 3001rc1
    if saltvers.startswith("v") and installmethod == "git":
        saltvers = saltvers[1:]
    assert saltvers in cmd.stdout
    assert cmd.rc == 0


def test_salt_python_version(host, pyvers):
    cmd = host.run("salt-call --versions-report")
    assert "Python: {}".format(pyvers) in cmd.stdout
    assert cmd.rc == 0
