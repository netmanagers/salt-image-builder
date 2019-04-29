control 'commands and tools used for testing' do
  title 'should be installed'

  %w(
    git
    netstat
    ps
  ).each do |c|
    describe command(c) do
      it { should exist }
    end
  end
end
