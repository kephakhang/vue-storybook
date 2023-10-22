<script setup lang="ts">
import { CtaButton } from "@emdn/ui";
import { Icon, loadIcon } from "@iconify/vue";
import { inject, onMounted, ref } from "vue";

const customerName = inject<string>("customerName");
const samlIdp = inject<string>("samlIdp");

const props = defineProps<{
  login: (email: string, password: string) => void;
  errorMessage?: string;
}>();

const email = ref("");
const password = ref("");
const isPasswordVisible = ref(false);

function onSubmit(event: Event) {
  event.preventDefault();
  if (email.value.length === 0 || password.value.length === 0) return;
  props.login(email.value, password.value);
}

function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value;
}

onMounted(() => {
  void loadIcon("fa6-regular:eye-slash");
});
</script>

<template>
  <form @submit="onSubmit">
    <div class="flex h-8 items-center rounded-sm bg-white">
      <Icon
        class="mx-3 h-5 w-5"
        icon="material-symbols:person-outline"
      />
      <input
        v-model="email"
        class="h-full flex-1 rounded-sm pl-2 text-sm text-gray-500"
        type="email"
        required
        placeholder="Email Address"
      />
    </div>
    <div class="h-4"></div>
    <div class="relative flex h-8 items-center rounded-sm bg-white">
      <Icon
        class="mx-3 w-5"
        icon="mdi:password-outline"
      />
      <input
        v-model="password"
        class="h-full flex-1 rounded-sm pl-2 text-sm text-gray-500"
        required
        :type="isPasswordVisible ? 'text' : 'password'"
        placeholder="Password"
      />
      <button
        type="button"
        class="absolute right-0 top-1/2 -translate-y-1/2 px-2"
        @click="togglePasswordVisibility"
      >
        <Icon
          v-if="isPasswordVisible"
          icon="fa6-regular:eye"
        />
        <Icon
          v-else
          icon="fa6-regular:eye-slash"
        />
      </button>
    </div>
    <div class="h-6"></div>
    <div class="flex justify-between">
      <CtaButton
        type="submit"
        class="px-6"
      >
        Login
      </CtaButton>
      <CtaButton variant="text">Forgot Password?</CtaButton>
    </div>
    <div class="h-3"></div>
    <form
      v-if="samlIdp && customerName === 'dyson'"
      action="/saml/login?disco=true"
      method="get"
    >
      <input
        type="hidden"
        name="idp"
        :value="samlIdp"
      />
      <button
        type="submit"
        class="my-2 w-full rounded-sm border bg-[#a1a3a8] py-1.5 text-center"
      >
        <strong>Dyson SSO</strong>
      </button>
    </form>

    <a
      v-if="samlIdp === 'https://fedauth.pg.com'"
      href="https://fedauth.pg.com/idp/startSSO.ping?PartnerSpId=https%3A%2F%2Fps0611.emoldino.com"
    >
      <button
        type="submit"
        class="my-2 w-full rounded-sm border bg-[#a1a3a8] py-1.5 text-center"
      >
        <strong>P&G SSO</strong>
      </button>
    </a>

    <form
      v-if="samlIdp && customerName === 'ns0407'"
      action="/saml/login?disco=true"
      method="get"
    >
      <input
        type="hidden"
        name="idp"
        :value="samlIdp"
      />
      <button
        type="submit"
        class="my-2 w-full rounded-sm border bg-[#a1a3a8] py-1.5 text-center"
      >
        <strong>Nestle SSO</strong>
      </button>
    </form>
  </form>
</template>
