import cn from 'classnames';
import Link from 'next/link';

export default function CoverImage({ title, url, uid }) {
  const image = (
    <img
      src={url}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': uid,
      })}
    />
  );
  return (
    <div className="-mx-5 sm:mx-0">
      {uid ? (
        <Link as={`/projects/${uid}`} href="/projects/[uid]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
