import { slugifyStr } from '@utils/slugify';
import Datetime from './Datetime';
import type { CollectionEntry } from 'astro:content';

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<'posts' | 'portfolio'>['data'];
  secHeading?: boolean;
  details?: boolean;
}

export default function Card({
  href,
  frontmatter,
  secHeading = true,
  details = true,
}: Props) {
  const { title, pubDatetime, modDatetime, description, cover, coverAlt } =
    frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: 'text-lg font-medium decoration-dashed hover:underline',
  };

  return (
    <li className='my-6'>
      <a
        href={href}
        className='inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0'
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      {details && (
        <div>
          <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
          <p>{description}</p>
        </div>
      )}

      {cover && coverAlt && (
        <a href={href} className='prose'>
          <img
            src={cover.src}
            width={cover.width}
            height={cover.height}
            alt={coverAlt}
          />
        </a>
      )}
    </li>
  );
}
