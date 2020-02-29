def test_salt_version(host, saltvers):
    cmd = host.run("salt-call --version")
    if saltvers in ["latest", "master"]:
        saltvers = "3000"
    assert saltvers in cmd.stdout
    assert cmd.rc == 0


def test_salt_python_version(host, pyvers):
    cmd = host.run("salt-call --versions-report")
    assert "Python: {}".format(pyvers) in cmd.stdout
    assert cmd.rc == 0
