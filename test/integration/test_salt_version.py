import re


def test_salt_version(host, saltvers, installmethod):
    cmd = host.run("salt-call --version")
    # See https://github.com/saltstack/salt/blob/01b22ea1b141/salt/version.py#L54-L63
    git_sha_regex = r"g?[a-f0-9]{7,40}"
    major_minor = r"3\d{3}"
    pep440_master_format = major_minor + r"\+0na." + git_sha_regex
    pep440_onedir_format = major_minor + r"(rc\d)?\+\d{1,4}." + git_sha_regex
    if saltvers == "master":
        # New PEP440-compliant `master` format
        # https://pythex.org/?regex=3%5Cd%7B3%7D%5C%2B0na.g%3F%5Ba-f0-9%5D%7B7%2C40%7D&test_string=3003%2B0na.10c4da2%0A3004%2B0na.f39e419&ignorecase=0&multiline=0&dotall=0&verbose=0
        saltvers = pep440_master_format
    elif installmethod == "onedir":
        # Either: new PEP440-compliant `onedir` format or even major/minor
        # https://pythex.org/?regex=3%5Cd%7B3%7D(rc%5Cd)%3F%5C%2B%5Cd%7B1%2C4%7D.g%3F%5Ba-f0-9%5D%7B7%2C40%7D%7C3%5Cd%7B3%7D&test_string=3003rc1%2B52.g10c4da25c2%0A3003rc1%2B52.g10c4da2%0A3004&ignorecase=0&multiline=0&dotall=0&verbose=0
        saltvers = pep440_onedir_format + r"|" + major_minor
    else:
        # Handle version branch when installing from git, remove leading "v"
        # v3004rc1 becomes 3004rc1
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
