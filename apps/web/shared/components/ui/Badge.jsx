const CONFIG = {
    TRUE: {
        bg: 'bg-verdict-true/15',
        text: 'text-verdict-true',
        border: 'border-verdict-true/30',
        icon: (<svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"/>
      </svg>),
    },
    FALSE: {
        bg: 'bg-verdict-false/15',
        text: 'text-verdict-false',
        border: 'border-verdict-false/30',
        icon: (<svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"/>
      </svg>),
    },
    MISLEADING: {
        bg: 'bg-verdict-misleading/15',
        text: 'text-verdict-misleading',
        border: 'border-verdict-misleading/30',
        icon: (<svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"/>
      </svg>),
    },
    UNVERIFIED: {
        bg: 'bg-verdict-unverified/15',
        text: 'text-verdict-unverified',
        border: 'border-verdict-unverified/30',
        icon: (<svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"/>
      </svg>),
    },
    pending: {
        bg: 'bg-verdict-pending/15',
        text: 'text-verdict-pending',
        border: 'border-verdict-pending/30',
        icon: (<svg className="h-3 w-3 animate-spin-slow" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
      </svg>),
    },
    processing: {
        bg: 'bg-accent/15',
        text: 'text-accent-light',
        border: 'border-accent/30',
        icon: (<svg className="h-3 w-3 animate-spin-slow" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
      </svg>),
    },
    failed: {
        bg: 'bg-verdict-false/15',
        text: 'text-verdict-false',
        border: 'border-verdict-false/30',
        icon: (<svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"/>
      </svg>),
    },
};
export function Badge({ verdict, size = 'md', className = '' }) {
    if (!verdict)
        return null;
    const key = verdict in CONFIG ? verdict : 'UNVERIFIED';
    const { bg, text, border, icon } = CONFIG[key];
    const sizeClasses = size === 'sm'
        ? 'px-2 py-0.5 text-[11px] gap-1'
        : 'px-3 py-1 text-[12px] gap-1.5';
    return (<span className={`inline-flex items-center rounded-full border font-semibold ${bg} ${text} ${border} ${sizeClasses} ${className}`}>
      {icon}
      {verdict.toUpperCase()}
    </span>);
}
