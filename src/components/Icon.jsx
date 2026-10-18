import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Award,
  Box,
  Briefcase,
  Check,
  ChevronRight,
  CircleAlert,
  CodeXml,
  Command,
  Copy,
  CornerDownLeft,
  Database,
  Download,
  ExternalLink,
  Globe,
  GraduationCap,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  Moon,
  Rocket,
  Search,
  Send,
  Server,
  Sparkles,
  Sun,
  Terminal,
  Wrench,
  X,
  Zap,
  GitBranch,
} from 'lucide-react'

import { GithubMark, LinkedinMark, WhatsappMark } from './BrandIcons.jsx'

/**
 * Name → component registry.
 *
 * The content in src/data/content.js refers to icons by name, so this is the
 * one place that turns those strings into components. Importing each icon by
 * name (rather than the whole library) is what keeps the icon chunk small —
 * add an import above and an entry here when you need a new one.
 *
 * Browsing names: https://lucide.dev/icons
 */
const REGISTRY = {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Award,
  Box,
  Briefcase,
  Check,
  ChevronRight,
  CircleAlert,
  CodeXml,
  Command,
  Copy,
  CornerDownLeft,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  Globe,
  GraduationCap,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  Moon,
  Rocket,
  Search,
  Send,
  Server,
  Sparkles,
  Sun,
  Terminal,
  Wrench,
  X,
  Zap,
  // Brand marks — not part of Lucide since v1
  Github: GithubMark,
  Linkedin: LinkedinMark,
  Whatsapp: WhatsappMark,
}

export default function Icon({ name, size = 18, strokeWidth = 2, className = '' }) {
  const Glyph = REGISTRY[name]

  if (!Glyph) {
    // Unknown name: hold the space so the layout doesn't shift.
    return <span aria-hidden="true" style={{ display: 'inline-block', width: size, height: size }} />
  }

  return <Glyph size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />
}
