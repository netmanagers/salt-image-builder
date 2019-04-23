version = attribute('version')

control 'salt minion' do
  title 'should be installed'

  describe command('salt-minion --version') do
    its('stdout') { should match /#{version}/ }
    its('exit_status') { should eq 0 }
  end
end
