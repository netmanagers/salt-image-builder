{%- from "test_jinja/pillar.jinja" import pillar with context %}

test_jinja/pillar/cmd.run:
  cmd.run:
    - name: pwd
