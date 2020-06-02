def pytest_addoption(parser):
    parser.addoption("--pyvers", action="store", default="3")
    parser.addoption("--saltvers", action="store", default="3000")
    parser.addoption("--installmethod", action="store", default="stable")


def pytest_generate_tests(metafunc):
    # This is called for every test. Only get/set command line arguments
    # if the argument is specified in the list of test "fixturenames".
    option_value = metafunc.config.option.pyvers
    if 'pyvers' in metafunc.fixturenames and option_value is not None:
        metafunc.parametrize("pyvers", [option_value])
    option_value = metafunc.config.option.saltvers
    if 'saltvers' in metafunc.fixturenames and option_value is not None:
        metafunc.parametrize("saltvers", [option_value])
    option_value = metafunc.config.option.installmethod
    if 'installmethod' in metafunc.fixturenames and option_value is not None:
        metafunc.parametrize("installmethod", [option_value])
