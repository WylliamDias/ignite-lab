import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson({ title, availableAt, type, slug }: LessonProps) {
  const { slug: slug_from_url } = useParams<{ slug: string; }>();

  const isLessonAvailable = isPast(availableAt);
  const formatedAvailableDate = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  });

  return (
    <Link to={`/event/lesson/${isLessonAvailable ? slug : slug_from_url}`} className="group">
      <span className="text-gray-300">
        {formatedAvailableDate}
      </span>

      <div className={`p-4 mt-2 border border-gray-500 rounded group-hover:border-green-500 transition-colors ${slug_from_url === slug ? 'bg-green-500' : ''}`}>
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={`flex items-center text-sm font-medium gap-2 ${isLessonAvailable ? 'text-white' : 'text-blue-500'}`}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="flex items-center text-sm font-medium text-orange-500 gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span className={`text-xs rounded px-2 py-[0.125rem] text-white border font-bold ${isLessonAvailable ? 'border-white' : 'border-green-300'}`}>
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong className={`block mt-5 ${isLessonAvailable ? 'text-white' : 'text-gray-200'}`}>
          {title}
        </strong>
      </div>
    </Link>
  );
}
