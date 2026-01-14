export default defineAppConfig({
  ui: {
    main: {
      base: 'min-h-[calc(90vh-var(--ui-header-height))]'
    },
    colors: {
      primary: 'brand',
      secondary: 'brand-sec',
      info: 'brand-info'
    },
    pageCard: {
      slots: {
        wrapper: 'flex flex-col flex-1 items-start',
      }
    },
    modal: {
      slots: {
        footer: 'justify-end'
      }
    },
    pageGrid: {
      base: 'relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4'
    },
    footer: {
      slots: {
        container: 'py-0 lg:py-2 lg:flex lg:items-center lg:justify-between lg:gap-x-3',
      }
    },
    table: {
      slots: {
        tr: 'even:bg-primary-50 dark:even:bg-primary-800/50 hover:bg-primary-100 dark:hover:bg-primary-700/50'
      }
    },
    formField: {
      defaultVariants: {
        size: 'sm'
      }
    },
    input: {
      defaultVariants: {
        size: 'sm'
      }
    },
    inputDate: {
      defaultVariants: {
        size: 'sm'
      }
    },
    select: {
      defaultVariants: {
        size: 'sm'
      }
    }
  }
})
