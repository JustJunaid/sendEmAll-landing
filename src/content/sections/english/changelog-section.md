---
enable: true # Control the visibility of this section across all pages where it is used
title: Changelog - **What's New**

list:
  - title: Warmup 2.0
    version: 2.4.0
    date: 28 Mar, 2026
    content: |
      Improved mailbox ramp-up algorithm with adaptive daily send limits based on engagement metrics. New per-mailbox deliverability scoring gives you real-time visibility into sender reputation. Automatic throttling when scores dip below safe thresholds.
    types:
      - icon: /images/icons/svg/improvement.svg
        label: Enhancement
    changes:
      - active: true
        title: Changes
        list:
          - label: Ramp-Up
            color: indigo # emerald | indigo | slate | crimson | amber
            content: |
              Adaptive daily send limits now respond to bounce rates and reply rates in real time
          - label: Deliverability
            color: emerald # emerald | indigo | slate | crimson | amber
            content: |
              Per-mailbox deliverability score visible on the infrastructure dashboard
          - label: Throttling
            color: slate # emerald | indigo | slate | crimson | amber
            content: |
              Automatic send throttling when deliverability score drops below configurable threshold

  - title: MCP Server Launch
    version: 2.3.0
    date: 14 Mar, 2026
    content: |
      Connect SendEmAll to any AI agent via our Model Context Protocol server. Full campaign management: create campaigns, manage potential buyer lists, check credit usage, and monitor replies, all from your AI workflow.
    types:
      - icon: /images/icons/svg/feature.svg
        label: New Feature
    changes:
      - active: true
        title: Changes
        list:
          - label: MCP
            color: emerald # emerald | indigo | slate | crimson | amber
            content: |
              New MCP server with tools for campaign creation, list management, and analytics queries
          - label: API
            color: indigo # emerald | indigo | slate | crimson | amber
            content: |
              All existing REST API endpoints now available as MCP tool calls
          - label: Docs
            color: slate # emerald | indigo | slate | crimson | amber
            content: |
              Developer documentation with setup guides for Claude, Cursor, and custom agents

  - title: Credit Usage Dashboard
    version: 2.2.0
    date: 01 Mar, 2026
    content: |
      Real-time credit usage breakdown by action type: enrichment, verification, and sending. Export usage reports as CSV. Set budget alerts per campaign so you never overspend.
    types:
      - icon: /images/icons/svg/feature.svg
        label: New Feature
    changes:
      - active: true
        title: Changes
        list:
          - label: Dashboard
            color: emerald # emerald | indigo | slate | crimson | amber
            content: |
              Credit usage breakdown by action type with daily, weekly, and monthly views
          - label: Export
            color: indigo # emerald | indigo | slate | crimson | amber
            content: |
              Export credit usage reports as CSV filtered by date range and campaign
          - label: Alerts
            color: amber # emerald | indigo | slate | crimson | amber
            content: |
              Configurable budget alerts per campaign with email and in-app notifications
---
