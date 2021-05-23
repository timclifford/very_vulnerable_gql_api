import * as React from 'react';
import Link from 'next/link';

export default React.forwardRef(({ to, ...props }, ref) => {
  return (
    <Link href={to}>
      <a {...props} ref={ref} />
    </Link>
  );
});