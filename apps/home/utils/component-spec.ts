import type MissingComponent from '~/components/content/MissingComponent.vue'

export interface BaseComponentSpec {
  /**
   * Specifies whether the component can be used at the top level of a page's `<main>` content area.
   */
  isPageComponent: boolean

  /**
   * Specifies whether the component has slots that can contain other components.
   */
  isParent: boolean

  /**
   * Specifies whether the component has the #actions-slot that shows links as buttons.
   */
  // hasActionSlot?: boolean
  // maybe we add this later, at the moment it is all the same
  // with having the buttons inside the prose-slot

  /**
   * The name of the Vue component `prop` that will be used to pass the image URL to the component.
   *
   * If the component does not have an image, it is `undefined`.
   */
  imgProp?: string
  /**
   * Should we run a component-specific extension prior to the body-transformation within the beforeParse-Hook?
   */
  beforeParseExtension?: boolean
  /**
   * Should we run a component-specific extension within the afterParse-Hook?
   */
  afterParseExtension?: boolean
}

export interface SingletonComponentSpec extends BaseComponentSpec {
  isParent: false
  allowsProse: boolean
}

export interface ParentComponentSpec extends BaseComponentSpec {
  isParent: true

  /**
   * Specifies whether the component can contain prose content as a direct child.
   */
  allowsProse: boolean
}

export type ComponentSpec = SingletonComponentSpec | ParentComponentSpec

/**
 * A map of component names to their specifications.
 *
 * @example
 * ```ts
 * import { kebabCase } from 'scule'
 *
 * for (const [name, spec] of Object.entries(componentSpecs)) {
 *   const kebabName = kebabCase(name)
 *
 *   if (spec.isPageComponent) {
 *     // Do something
 *   }
 * }
 * ```
 */

export type ComponentName = keyof typeof componentSpecs

export type AlertComponent =
  | 'abstract'
  | 'summary'
  | 'tldr'
  | 'info'
  | 'todo'
  | 'tip'
  | 'hint'
  | 'important'
  | 'success'
  | 'check'
  | 'done'
  | 'question'
  | 'help'
  | 'faq'
  | 'warning'
  | 'fail'
  | 'failure'
  | 'missing'
  | 'danger'
  | 'error'
  | 'bug'
  | 'example'
  | 'quote'
  | 'cite'

export const componentSpecs: Record<string, ComponentSpec> = {
  // ts-expect-error - Hans does not understand why this is an error
  Alert: {
    isParent: false,
    beforeParseExtension: true,
    isPageComponent: false,
    allowsProse: true,
  },
  Banner: {
    isPageComponent: true,
    isParent: true,
    allowsProse: true,
  },
  ButtonTmp: {
    isPageComponent: false,
    isParent: true,
    allowsProse: false,
  },
  CardsGallery: {
    isPageComponent: true,
    isParent: true,
    allowsProse: true,
  },
  Catalog: {
    isPageComponent: false,
    isParent: true,
    beforeParseExtension: true,
    allowsProse: true,
  },
  Column: {
    isPageComponent: false,
    isParent: true,
    allowsProse: true,
  },
  Columns: {
    isPageComponent: true,
    isParent: true,
    allowsProse: false,
  },
  DataViewTabs: {
    isPageComponent: true,
    isParent: true,
    allowsProse: false,
  },
  // DataView may act as Child of DataViewTabs!!
  DataView: {
    isPageComponent: true,
    isParent: false,
    allowsProse: false,
  },
  FormTmp: {
    isPageComponent: false,
    isParent: true,
    allowsProse: true,
  },
  Heading: {
    isPageComponent: false,
    isParent: false,
    allowsProse: true,
  },
  Hero: {
    isPageComponent: true,
    isParent: true,
    allowsProse: true,
    imgProp: 'imgTmp',
  },
  InputTmp: {
    isPageComponent: false,
    isParent: false,
    allowsProse: false,
  },
  MissingComponent: {
    isPageComponent: true,
    isParent: false,
    allowsProse: false,
  },
  Prose: {
    isPageComponent: false,
    isParent: true,
    allowsProse: false,
  },
  RadioGroup: {
    isPageComponent: false,
    isParent: false,
    allowsProse: false,
  },

  // TODO: decide on SectionContainer-Functionality
  // we should decide if we want to build a general spec 'hasSectionContainer'
  // components with isPageComponent and hasSectionContainer cannot act as childs anyewhere
  // in the current implementation the parser easily detects this and skips adding the sectionContainer
  // for instance the EmbedData could have a sectionContainer and thus gain more control over the layout
  SectionContainer: {
    isPageComponent: true,
    isParent: true,
    allowsProse: true,
  },
  Slide: {
    isPageComponent: false,
    isParent: true,
    allowsProse: true,
  },
  Slider: {
    isPageComponent: false,
    isParent: true,
    allowsProse: false,
  },
  TextAreaTmp: {
    isPageComponent: false,
    isParent: false,
    allowsProse: false,
  },
  Timeline: {
    isPageComponent: true,
    isParent: true,
    allowsProse: true,
  },
}
