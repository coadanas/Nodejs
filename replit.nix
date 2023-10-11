{ pkgs }: {
  deps = [
    pkgs.rs
    pkgs.openssh_with_kerberos
    pkgs.nano
    pkgs.openssh
  ];
}
