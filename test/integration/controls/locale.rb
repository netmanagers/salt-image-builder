control 'system locale' do
  title 'should be configured'

  describe command('locale -a') do
    its('stdout') { should match /en_US.utf8/ }
    its('stdout') { should match /POSIX/ }
    its('exit_status') { should eq 0 }
  end
end
