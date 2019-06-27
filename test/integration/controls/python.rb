version = input('py_version') == '3' ? '3' : ''

control 'python and python tools' do
  title 'should match the desired version'

  [ "python#{version}", "pip#{version}"].each do |c|
    describe command(c) do
      it { should exist }
    end
  end
end
