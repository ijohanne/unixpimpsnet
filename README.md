# unixpimps.net

A NixOS module that serves the [unixpimps.net](https://unixpimps.net) website via nginx.

## Usage

Add this flake to your NixOS configuration:

```nix
{
  inputs.unixpimpsnet.url = "github:martin8412/unixpimpsnet";

  outputs = { nixpkgs, unixpimpsnet, ... }: {
    nixosConfigurations.myhost = nixpkgs.lib.nixosSystem {
      modules = [
        unixpimpsnet.nixosModules.default
        {
          services.unixpimpsnet = {
            enable = true;
            domain = "unixpimps.net";
            acme = true;
            extraDomains = [ "www.unixpimps.net" ];
          };
        }
      ];
    };
  };
}
```

## Local development

```sh
direnv allow   # or: nix develop
serve          # serves the site at http://localhost:8080
```

## License

MIT
