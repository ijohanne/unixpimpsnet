{
  description = "unixpimps.net — one-pager website, nginx vhost module";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      forAllSystems = nixpkgs.lib.genAttrs [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      htmlRoot = ./html;
    in
    {
      nixosModules.default = import ./module.nix { unixpimpsnet-html = htmlRoot; };

      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          serve = pkgs.writeShellScriptBin "serve" ''
            echo "Serving unixpimps.net at http://localhost:8080"
            ${pkgs.nodePackages.http-server}/bin/http-server ${htmlRoot} -p 8080
          '';
        in
        {
          default = pkgs.mkShell {
            packages = [ serve ];
          };
        });
    };
}
