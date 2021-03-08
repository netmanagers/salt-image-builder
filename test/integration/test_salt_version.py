import re


def test_salt_version(host, saltvers, installmethod):
    cmd = host.run("salt-call --version")
    # See https://github.com/saltstack/salt/blob/01b22ea1b141/salt/version.py#L54-L63
    git_sha_regex = r"g?[a-f0-9]{7,40}"
    pep440_master_format = r"3003\+0na." + git_sha_regex
    master_format = r"3003-n/a-" + git_sha_regex
    pep440_tiamat_format = r"3002\+0na." + git_sha_regex
    tiamat_format = r"3002(.2)?-\d{3}-" + git_sha_regex
    major_minor = r"3002.2"
    if saltvers == "master":
        # Either: new PEP440-compliant or existing `master` format
        # https://pythex.org/?regex=3002%5C%2B0na.g%3F%5Ba-f0-9%5D%7B7%2C40%7D%7C3002-n%2Fa-g%3F%5Ba-f0-9%5D%7B7%2C40%7D&test_string=3002%2B0na.01b22ea%0A3002-n%2Fa-1e37616&ignorecase=0&multiline=0&dotall=0&verbose=0
        saltvers = pep440_master_format + r"|" + master_format
    elif saltvers == "tiamat":
        # Either: new PEP440-compliant, existing `tiamat` format or even major/minor
        # https://pythex.org/?regex=3002%5C%2B0na.g%3F%5Ba-f0-9%5D%7B7%2C40%7D%7C3002(.2)%3F-%5Cd%7B3%7D-g%3F%5Ba-f0-9%5D%7B7%2C40%7D%7C3002.2&test_string=3002%2B0na.2627e6c%0A3002.2-117-gda6819735c%0A3002-117-gda6819735c%0A3002.2&ignorecase=0&multiline=0&dotall=0&verbose=0
        saltvers = pep440_tiamat_format + r"|" + tiamat_format + r"|" + major_minor
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
