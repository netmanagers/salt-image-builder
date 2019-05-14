control 'system locale' do
  title 'should be configured'

  describe command('locale') do
    its('stdout') { should match /LANG=en_US.utf8/ }
    its('stdout') { should match /LC_CTYPE="en_US.utf8"/ }
    its('stdout') { should match /LC_NUMERIC="en_US.utf8"/ }
    its('stdout') { should match /LC_MESSAGES="en_US.utf8"/ }
    its('stdout') { should match /LC_COLLATE="en_US.utf8"/ }
    its('stdout') { should match /LC_NAME="en_US.utf8"/ }
    its('exit_status') { should eq 0 }
  end
end
