def test_locale(host):
    # This command is executed inside the tested container.
    cmd = host.run("locale -a")
    # Using stdout_bytes instead of plain stdout to deal with python2 and utf-8
    assert any(utf8 in cmd.stdout_bytes for utf8 in [b"en_US.utf8", b"C.UTF-8"])
    assert b"POSIX" in cmd.stdout_bytes
    assert cmd.rc == 0
