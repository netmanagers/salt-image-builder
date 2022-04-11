{%- from "./grains.jinja" import grains with context %}

test_jinja/grains/cmd.run:
  cmd.run:
    - name: pwd
