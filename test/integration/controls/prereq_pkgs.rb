control 'formulas prerequisites' do
  title 'should be installed'

  case os[:name]
  when 'centos'
    pkgs = %w(git)
  when 'fedora'
    pkgs = %w(systemd-udev git)
  when 'opensuse'
    pkgs = %w(udev git glibc-locale)
  when 'debian', 'ubuntu'
    pkgs = %w(udev git locales procps)
  end

  pkgs.each do |p|
    describe package(p) do
      it { should be_installed }
    end
  end
end
