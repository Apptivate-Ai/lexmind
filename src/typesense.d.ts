declare module 'typesense-instantsearch-adapter' {
  interface TypesenseServerConfig {
    apiKey: string;
    nodes: Array<{
      host: string;
      port: number;
      protocol: string;
    }>;
    cacheSearchResultsForSeconds?: number;
  }

  interface TypesenseInstantSearchAdapterOptions {
    server: TypesenseServerConfig;
    additionalSearchParameters?: Record<string, any>;
  }

  class TypesenseInstantSearchAdapter {
    constructor(options: TypesenseInstantSearchAdapterOptions);
    searchClient: any;
  }

  export default TypesenseInstantSearchAdapter;
}

declare module 'react-instantsearch-dom' {
  import * as React from 'react';

  // Basic interfaces
  interface BaseProps {
    className?: string;
    [key: string]: any;
  }

  // InstantSearch
  interface InstantSearchProps extends BaseProps {
    indexName: string;
    searchClient: any;
  }
  export class InstantSearch extends React.Component<InstantSearchProps> {}

  // SearchBox
  interface SearchBoxProps extends BaseProps {
    defaultRefinement?: string;
    searchAsYouType?: boolean;
    autoFocus?: boolean;
    placeholder?: string;
    onSubmit?: (event: React.FormEvent) => void;
    onReset?: (event: React.FormEvent) => void;
    onKeyUp?: (event: React.KeyboardEvent) => void;
  }
  export class SearchBox extends React.Component<SearchBoxProps> {}

  // Hits
  interface HitsProps extends BaseProps {
    hitComponent: React.ComponentType<{ hit: any }>;
  }
  export class Hits extends React.Component<HitsProps> {}

  // RefinementList
  interface RefinementListProps extends BaseProps {
    attribute: string;
    operator?: 'and' | 'or';
    limit?: number;
    showMore?: boolean;
    showMoreLimit?: number;
    searchable?: boolean;
    translations?: {
      showMore?: string;
      showLess?: string;
      noResults?: string;
      placeholder?: string;
    };
  }
  export class RefinementList extends React.Component<RefinementListProps> {}

  // ClearRefinements
  interface ClearRefinementsProps extends BaseProps {
    clearsQuery?: boolean;
    excludeAttributes?: string[];
    translations?: {
      resetButtonText?: string;
    };
  }
  export class ClearRefinements extends React.Component<ClearRefinementsProps> {}

  // Stats
  interface StatsProps extends BaseProps {
    translations?: {
      stats?: (nbHits: number, processingTimeMS?: number) => string;
    };
  }
  export class Stats extends React.Component<StatsProps> {}

  // Configure
  interface ConfigureProps {
    [key: string]: any;
  }
  export class Configure extends React.Component<ConfigureProps> {}

  // Pagination
  interface PaginationProps extends BaseProps {
    padding?: number;
    showFirst?: boolean;
    showLast?: boolean;
    showPrevious?: boolean;
    showNext?: boolean;
    totalPages?: number;
    translations?: {
      previous?: string;
      next?: string;
      first?: string;
      last?: string;
      page?: (currentPage: number) => string;
      ariaPrevious?: string;
      ariaNext?: string;
      ariaFirst?: string;
      ariaLast?: string;
      ariaPage?: (currentPage: number) => string;
    };
  }
  export class Pagination extends React.Component<PaginationProps> {}
} 