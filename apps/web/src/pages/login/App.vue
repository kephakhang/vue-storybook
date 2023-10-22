<script setup lang="ts">
import { CtaButton } from "@emdn/ui";
import { Icon } from "@iconify/vue";
import LoginForm from "./components/login-form.vue";

// TOOD(sun.lee): Implement login function using @tanstack/vue-query
function login(email: string, password: string) {
  console.log("🚀 ~ file: App.vue:7 ~ login ~ email:", email);
  console.log("🚀 ~ file: App.vue:7 ~ login ~ password:", password);
}

function onRequestAccess() {
  location.href = "/register";
}
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-center bg-[url('/images/login-background.png')] bg-cover"
  >
    <div class="flex flex-col">
      <Icon
        icon="emdn:emoldino-logo"
        class="h-4 w-24"
      />
      <div class="h-4"></div>
      <div class="flex bg-white/20">
        <div class="flex w-[27rem] flex-col justify-center px-10 py-16">
          <p class="text-4xl font-semibold text-white">Login</p>
          <div class="h-3"></div>
          <p class="text-white">Sign in to your account</p>
          <div class="h-6"></div>
          <LoginForm :login="login" />
        </div>
        <div class="hidden h-full py-12 lg:flex">
          <div
            class="flex h-full flex-col items-center justify-center border-l-[1.5px] border-l-white px-11"
          >
            <p class="text-3xl text-white">Request Access</p>
            <div class="h-9"></div>
            <p class="text-sm text-white">Request access from the</p>
            <p class="text-sm text-white">
              administrator to log into the system
            </p>
            <div class="h-8"></div>
            <CtaButton
              variant="outline"
              :click-handler="onRequestAccess"
            >
              Request Access
            </CtaButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
