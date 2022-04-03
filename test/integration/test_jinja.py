def test_jinja_grains(host):
    cmd = host.run("salt-call --local state.sls test_jinja.grains")
    assert cmd.rc == 0


def test_jinja_opts(host):
    cmd = host.run("salt-call --local state.sls test_jinja.opts")
    assert cmd.rc == 0


def test_jinja_pillar(host):
    cmd = host.run("salt-call --local state.sls test_jinja.pillar")
    assert cmd.rc == 0


def test_jinja_salt(host):
    cmd = host.run("salt-call --local state.sls test_jinja.salt")
    assert cmd.rc == 0
