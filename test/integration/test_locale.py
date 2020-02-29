def test_locale(host):
    # This command is executed inside the tested container.
    cmd = host.run("locale -a")
    # Using stdout_bytes instead of plain stdout to deal with pyhon2 and utf-8
    assert b"en_US.utf8" in cmd.stdout_bytes
    assert b"POSIX" in cmd.stdout_bytes
    assert cmd.rc == 0
