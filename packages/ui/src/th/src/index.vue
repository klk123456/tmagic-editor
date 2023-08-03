<template>
  <th :colspan="config.atr.colspan">
    {{config.text}}
    <magic-ui-container class="magic-ui-overlay"
                        :config="{ items: config.items }">
    </magic-ui-container>
  </th>
</template>

<script lang="ts" setup>
import { MComponent } from "@tmagic/schema";

import useApp from "../../useApp";

const props = withDefaults(
  defineProps<{
    config: MComponent;
    model?: any;
  }>(),
  {
    model: () => ({}),
  }
);

useApp({
  config: props.config,
  methods: {},
});
</script>
