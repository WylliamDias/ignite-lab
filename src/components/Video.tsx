import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, FileArrowDown, Image } from "phosphor-react";
import { Button } from "./Button";

import '@vime/core/themes/default.css';
import { useGetLEssonBySlugQuery } from "../graphql/generated";

interface VideoProps {
  lessonSlug: string;
}

export function Video({ lessonSlug }: VideoProps) {
  const { data } = useGetLEssonBySlugQuery({
    variables: {
      slug: lessonSlug
    }
  });

  if (!data || !data.lesson) {
    return (
      <div className="flex-1">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="bg-black">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data.lesson.title}
            </h1>
            <p className="mt-4 leading-relaxed text-gray-200">
              {data.lesson.description}
            </p>

            {data.lesson.teacher && (
              <div className="flex items-center mt-6 gap-4">
                <img
                  className="w-16 h-16 border-2 border-blue-500 rounded-full"
                  src={data.lesson.teacher.avatarURL}
                  alt="Foto do professor"
                />

                <div className="leading-relaxed">
                  <strong className="block text-2xl font-bold">{data.lesson.teacher.name}</strong>
                  <span className="block text-sm text-gray-200">{data.lesson.teacher.bio}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Button variant="primary" />
            <Button variant="secondary" />
          </div>
        </div>

        <div className="mt-20 gap-8 grid grid-cols-2">
          <a href="" className="flex items-stretch overflow-hidden bg-gray-700 rounded gap-6 hover:bg-gray-600 transition-colors">
            <div className="flex items-center h-full p-6 bg-green-700">
              <FileArrowDown size={40} />
            </div>

            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material Complementar</strong>
              <p className="mt-2 text-sm text-gray-200">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>

            <div className="flex items-center h-full p-6">
              <CaretRight size={24} />
            </div>
          </a>

          <a href="" className="flex items-stretch overflow-hidden bg-gray-700 rounded gap-6 hover:bg-gray-600 transition-colors">
            <div className="flex items-center h-full p-6 bg-green-700">
              <Image size={40} />
            </div>

            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="mt-2 text-sm text-gray-200">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>

            <div className="flex items-center h-full p-6">
              <CaretRight size={24} />
            </div>
          </a>
        </div>

      </div>
    </div>
  );
}
