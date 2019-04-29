version = attribute('version')

control 'salt call' do
  title 'should be installed'

  describe command('salt-call --version') do
    its('stdout') { should match /#{version}/ }
    its('exit_status') { should eq 0 }
  end
end
