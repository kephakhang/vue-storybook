<script setup lang="ts">
import { CtaButton } from "@emdn/ui";
import { Icon } from "@iconify/vue";
import { computed, reactive, ref } from "vue";
import { AppFrame, FormSectionFrame } from "~/common/components";
import { useAppInfo } from "~/common/hooks";
import { createUserApi, type Company, type CreateUserInputInput } from "./api";
import {
  CompanySearchDialog,
  CountryDialDropdown,
  CustomAlert,
  FieldLabel,
  UserInput,
} from "./components";
import {
  ACCESS_LEVEL_LIST,
  PASSWORD_PATTERN,
  STATUS_ACCESS_LIST,
} from "./types";

const { me } = useAppInfo();

const userData = reactive<CreateUserInputInput>({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  companyId: NaN,
  companyName: "",
  department: "",
  position: "",
  mobileNumber: "",
  memo: "",
  status: "ENABLED",
  accessLevel: "REGULAR",
  companyType: "",
  mobileDialingCode: "82",
});

const alertData = reactive<{
  visible: boolean;
  message: string;
  callback: () => void;
}>({
  visible: false,
  message: "",
  callback: () => {},
});

const companySearchDialogVisible = ref(false);
const showPassword = ref(false);
const shouldShowPasswordGuide = ref(false);

const displayedAccessLevelList = computed(() => {
  const shouldShowAdmin = me.value?.company?.companyType === "IN_HOUSE";
  return shouldShowAdmin
    ? ACCESS_LEVEL_LIST
    : ACCESS_LEVEL_LIST.filter((item) => item.value !== "ADMIN");
});

const passwordValidationList = computed(() => [
  { label: "8 characters", isValid: userData.password.length > 7 },
  { label: "One uppercase letter", isValid: /[A-Z]/.test(userData.password) },
  { label: "One number", isValid: /\d/.test(userData.password) },
  {
    label: "One special character: .,!@#$%^&*+=_-",
    isValid: /[,!@#$%^&*)(+=._-]/.test(userData.password),
  },
]);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleCompanySearchDialogOpen = (value: boolean) => {
  companySearchDialogVisible.value = value;
};

const handleSelectCompany = (data: Company) => {
  userData.companyId = data.id;
  userData.companyName = data.name;
  userData.companyType = data.companyType;
  handleCompanySearchDialogOpen(false);
};

const handleSelectMobileDialingCode = (code: string) => {
  userData.mobileDialingCode = code;
};

const handleUpdateAlert = (value: boolean) => {
  alertData.visible = value;
  if (!value) {
    alertData.callback();
    alertData.callback = () => {};
  }
};

const openAlert = (message: string, callback = () => {}) => {
  alertData.message = message;
  alertData.callback = callback;
  handleUpdateAlert(true);
};

const createUser = async () => {
  try {
    const result = await createUserApi.createUser(userData);
    if (result.success) {
      // TODO(PhuongPhg): will update the new path after the page is ready
      openAlert("success", () => {
        location.href = "/admin/users";
      });
    } else {
      openAlert(result.message!);
    }
  } catch (error) {
    console.error(error);
  }
};
const handleSubmit = async () => {
  if (userData.password != userData.passwordConfirm) {
    openAlert("The entered passwords do not match.");
    return;
  }
  if (!userData.companyId) {
    openAlert("Company is required!");
    return;
  }
  await createUser();
};
</script>

<template>
  <AppFrame>
    <div
      id="create-user-container"
      class="mt-8 w-full px-8 py-0 text-base text-slate-700"
    >
      <form @submit.prevent="handleSubmit">
        <h5
          class="relative mb-4 flex items-center rounded border border-solid border-gray-300 bg-gray-50 px-5 py-3 text-lg font-medium text-slate-900"
        >
          <Icon
            icon="fa-solid:user"
            class="h-4 w-4 text-black"
          />
          <span class="ml-0.5">Create User</span>
        </h5>

        <FormSectionFrame title="Account">
          <div class="flex">
            <FieldLabel
              label="Full Name"
              required
              class="w-1/6"
            />
            <UserInput
              id="name"
              v-model="userData.name"
              required
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div class="flex">
            <FieldLabel
              label="Email Address"
              required
              class="w-1/6"
            />
            <UserInput
              id="email"
              v-model="userData.email"
              required
              type="email"
              placeholder="Email Address"
              autocomplete="new-password"
            />
          </div>
        </FormSectionFrame>
        <FormSectionFrame title="Password">
          <div class="relative flex w-full">
            <FieldLabel
              label="Password"
              required
              class="w-1/6"
            />
            <div class="flex w-5/6 flex-col">
              <UserInput
                id="password-1"
                v-model="userData.password"
                required
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                :pattern="PASSWORD_PATTERN"
                wrapper-class="w-full"
                autocomplete="new-password"
                @input="shouldShowPasswordGuide = true"
              />
              <div v-if="shouldShowPasswordGuide">
                <p class="mb-4 mt-1 pl-4 text-sm">
                  Your password must contain at least:
                </p>
                <div class="flex flex-col pl-4 text-sm">
                  <div
                    v-for="(validationLine, index) in passwordValidationList"
                    :key="index"
                    class="ml-3 flex flex-row items-center"
                  >
                    <Icon
                      v-if="!validationLine.isValid"
                      icon="fluent-mdl2:status-error-full"
                      class="h-3 w-3 text-red-600"
                    />
                    <Icon
                      v-else
                      icon="icon-park-solid:check-one"
                      class="h-3 w-3 text-green-700"
                    />
                    <p
                      class="ml-1"
                      :class="{
                        'text-red-600': !validationLine.isValid,
                        'text-green-700': validationLine.isValid,
                      }"
                    >
                      {{ validationLine.label }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="absolute right-6 top-3 cursor-pointer"
              @click="togglePassword"
            >
              <Icon
                :icon="`quill:eye${showPassword ? '' : '-closed'}`"
                class="h-4 w-4"
              />
            </div>
          </div>
          <div class="relative flex w-full">
            <FieldLabel
              label="Confirm Password"
              required
              class="w-1/6"
            />
            <UserInput
              id="password-2"
              v-model="userData.passwordConfirm"
              required
              :type="showPassword ? 'text' : 'password'"
              placeholder="Confirm Password"
              :pattern="PASSWORD_PATTERN"
              autocomplete="new-password"
            />
            <div
              class="absolute right-6 top-1/4 cursor-pointer"
              @click="togglePassword"
            >
              <Icon
                :icon="`quill:eye${showPassword ? '' : '-closed'}`"
                class="h-4 w-4"
              />
            </div>
          </div>
        </FormSectionFrame>
        <FormSectionFrame title="Profile">
          <div class="flex w-full">
            <FieldLabel
              label="Company"
              required
              class="w-1/6"
            />
            <UserInput
              v-model="userData.companyName"
              type="text"
              readonly
              class="w-1/3 bg-slate-300"
              wrapper-class="!w-1/3"
              required
            />
            <CtaButton
              variant="outline"
              type="button"
              class="ml-2 border-green-600 bg-transparent bg-none text-green-600 hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white active:shadow active:shadow-green-500 active:ring-green-600"
              @click="handleCompanySearchDialogOpen(true)"
            >
              Company Search
            </CtaButton>
          </div>
          <div class="flex w-full flex-row">
            <FieldLabel
              label="Department"
              required
              class="w-1/6"
            />
            <UserInput
              id="text-input1"
              v-model="userData.department"
              required
              placeholder="Department"
              wrapper-class="!w-1/3"
            />
            <FieldLabel
              label="Position"
              required
              class="w-1/6 pl-4"
            />
            <UserInput
              id="text-input2"
              v-model="userData.position"
              required
              placeholder="Position"
              wrapper-class="!w-1/3"
            />
          </div>
          <div class="flex w-full flex-row">
            <FieldLabel
              label="Mobile Number"
              class="w-1/6"
            />
            <div class="flex w-1/3 flex-row justify-between pl-2">
              <CountryDialDropdown
                class="w-24"
                :selected-value="userData.mobileDialingCode"
                :on-select="handleSelectMobileDialingCode"
              />
              <UserInput
                id="text-input4"
                v-model="userData.mobileNumber"
                type="tel"
                placeholder="Mobile Number"
                wrapper-class="mobile-phone-input-wrapper"
              />
            </div>
          </div>
          <div class="flex w-full">
            <FieldLabel
              label="Memo"
              class="w-1/6"
            />
            <div class="w-5/6 bg-white px-4">
              <textarea
                id="textarea-input"
                v-model="userData.memo"
                class="block w-full rounded border border-solid border-slate-300 bg-clip-padding px-3 py-1.5 text-base leading-normal text-stone-800 outline-0 transition-[border-color,shadow] delay-150 ease-in-out focus:border-blue-200 focus:ring focus:ring-blue-100 focus:ring-offset-0"
                type="text"
                placeholder="Memo"
                rows="3"
              ></textarea>
            </div>
          </div>
        </FormSectionFrame>
        <FormSectionFrame title="Access">
          <div class="flex w-full">
            <FieldLabel
              label="Status"
              required
              class="w-1/6"
            />
            <div class="mr-8 flex w-1/3">
              <div
                v-for="item in STATUS_ACCESS_LIST"
                :key="item.value"
                class="mr-3 inline-flex flex-row items-center justify-start"
              >
                <input
                  :id="'radio_' + item.value"
                  v-model="userData.status"
                  type="radio"
                  name="status"
                  :value="item.value"
                />
                <label class="ml-1.5">{{ item.label }}</label>
              </div>
            </div>
            <FieldLabel
              label="Access Level"
              required
              class="w-1/6"
            />
            <div class="flex w-1/3">
              <div
                v-for="item in displayedAccessLevelList"
                :key="item.value"
                class="mr-3 inline-flex w-fit flex-row items-center justify-start"
              >
                <input
                  :id="'radio_' + item.value"
                  v-model="userData.accessLevel"
                  type="radio"
                  name="accessLevel"
                  :value="item.value"
                />
                <label class="ml-1.5">{{ item.label }}</label>
              </div>
            </div>
          </div>
          <FieldLabel
            label="Plant Roles"
            class="w-1/6"
          />
        </FormSectionFrame>
        <div
          class="relative mb-4 flex w-full min-w-0 flex-col items-center justify-center rounded border border-solid border-gray-300 bg-white bg-clip-border p-5"
        >
          <div class="flex flex-row">
            <CtaButton
              type="submit"
              class="mr-1 border-blue-300 bg-blue-300 hover:border-blue-700 hover:bg-blue-600 focus:border-blue-700 focus:bg-blue-600 active:border-blue-700 active:bg-blue-700"
            >
              Create User
            </CtaButton>
            <CtaButton
              type="button"
              class="border border-gray-300 bg-white text-slate-900 hover:bg-white focus:bg-white active:bg-white"
            >
              Cancel
            </CtaButton>
          </div>
        </div>
      </form>
      <CompanySearchDialog
        :open="companySearchDialogVisible"
        :handle-open="handleCompanySearchDialogOpen"
        :handle-select="handleSelectCompany"
      />
      <CustomAlert
        :open="alertData.visible"
        :handle-open="handleUpdateAlert"
        :message="alertData.message"
      />
    </div>
  </AppFrame>
</template>

<style>
.mobile-phone-input-wrapper {
  /* 6rem is the dial code input */
  width: calc(100% - 6rem);
}
</style>
