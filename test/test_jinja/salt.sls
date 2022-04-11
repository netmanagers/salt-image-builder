{%- from "./salt.jinja" import salt with context %}

test_jinja/salt/cmd.run:
  cmd.run:
    - name: pwd
