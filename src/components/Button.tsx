import { DiscordLogo, Lightning } from "phosphor-react";

interface ButtonProps {
  variant: 'primary' | 'secondary';
}

export function Button({ variant }: ButtonProps) {
  switch (variant) {
    case 'primary':
      return (
        <a href="" className="flex items-center justify-center p-4 text-sm font-bold uppercase bg-green-500 rounded gap-2 hover:bg-green-700 transition-colors">
          <DiscordLogo size={24} />
          Comunidade do Discord
        </a>

      );

    case 'secondary':
      return (
        <a href="" className="flex items-center justify-center p-4 text-sm font-bold text-blue-500 uppercase border border-blue-500 rounded gap-2 hover:bg-blue-500 hover:text-gray-900 transition-colors">
          <Lightning size={24} />
          Acesse o desafio
        </a>
      );
  }
}
