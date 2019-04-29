control 'formulas prerequisites' do
  title 'should be installed'

  case os[:name]
  when 'centos'
    pkgs = %w(git net-tools)
  when 'fedora'
    pkgs = %w(systemd-udev git net-tools)
  when 'opensuse'
    pkgs = %w(git net-tools udev glibc-locale net-tools-deprecated)
  when 'debian', 'ubuntu'
    pkgs = %w(git net-tools udev locales procps)
  end

  pkgs.each do |p|
    describe package(p) do
      it { should be_installed }
    end
  end
end
