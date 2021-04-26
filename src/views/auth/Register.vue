<template>
  <div class="panel-wrapper">
    <span class="logo">
      <img
        src="../../assets/logo.png"
        alt=""
      >
    </span>

    <div class="slogan-wrapper">
      <div class="slogan">
        <img
          src="../../assets/login-bg2.svg"
          alt=""
        >
      </div>
    </div>

    <div class="panel-content">
      <v-app class="login-con">
        <!-- <v-spacer></v-spacer> -->
        <v-content>
          <v-container
            fluid
            fill-height
          >
            <v-layout
              align-center
              justify-center
            >
              <v-flex class="frame">
                <h1 v-if="!isMobile">
                  Create a Profile
                </h1>
                <v-form>
                  <v-text-field
                    v-model="FirstName"
                    prepend-icon="person"
                    clearable
                    label="First Name"
                    @keyup.enter.native="login"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="LastName"
                    prepend-icon="person"
                    clearable
                    @keyup.enter.native="login"
                    label="Last Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="EmailAddress"
                    prepend-icon="person"
                    clearable
                    label="Email Address"
                    @keyup.enter.native="login"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="PhoneNumber"
                    prepend-icon="lock"
                    @keyup.enter.native="login"
                    clearable
                    label="Phone Number"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="Password"
                    prepend-icon="lock"
                    @keyup.enter.native="login"
                    :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                    :type="showPwd ? 'text' : 'password'"
                    @click:append="showPwd = !showPwd"
                    label="Password"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="ConfirmPassword"
                    prepend-icon="lock"
                    @keyup.enter.native="login"
                    :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                    :type="showPwd ? 'text' : 'password'"
                    @click:append="showPwd = !showPwd"
                    label="Confirm Password"
                    required
                  ></v-text-field>
                  <v-layout
                    column
                    wrap
                    justify-end
                    align-end
                  >
                    <v-flex>
                      <v-btn
                        flat
                        small
                        color="primary"
                        @click="redirectLoginToAnAccount"
                      >
                        Login into an account
                      </v-btn>
                      <v-btn
                        :loading="loginLoading"
                        color="primary"
                        @click="Register"
                      >
                        <span slot="loader">Loading...</span>
                          Create Account
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>

        <v-footer
          color="#fbfbfb"
          height="auto"
        >
          <v-layout>
            <v-flex text-xs-center>
              <!-- {{ $t('common.copyrightMessage', { currentYear }) }} -->
            </v-flex>
          </v-layout>
        </v-footer>
      </v-app>
    </div>
  </div>
</template>

<script>
import { isMobile } from '@/utils/util';
import BaseLangbar from '@/components/widgets/BaseLangbar.vue';

export default {
  name: 'Login',
  components: {
    BaseLangbar,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      showPwd: false,
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      PhoneNumber: '',
      Password: '',
      ConfirmPassword: '',
      loginLoading: false,
    };
  },
  computed: {
    isMobile() {
      return isMobile();
    },
  },
  methods: {
    Register() {
      if (this.FirstName === '') {
        this.$message({
          type: 'error',
          text: 'First Name is required',
        });
        return;
      } if (this.LastName === '') {
        this.$message({
          type: 'error',
          text: 'Last Name is required',
        });
        return;
      } if (this.EmailAddress === '') {
        this.$message({
          type: 'error',
          text: 'Email Address is required',
        });
        return;
      } if (this.PhoneNumber === '') {
        this.$message({
          type: 'error',
          text: 'Phone Number is required',
        });
        return;
      } if (this.Password === '') {
        this.$message({
          type: 'error',
          text: 'Password is required',
        });
        return;
      } if (this.ConfirmPassword === '') {
        this.$message({
          type: 'error',
          text: 'Confirm Password is required',
        });
        return;
      }

      // Check if the phone number length is 11
      if (this.PhoneNumber.length !== 11) {
        this.$message({
          type: 'error',
          text: 'Phone Number must be 11 digits',
        });
        return;
      }

      // Check if the length of the password is greater than 8
      if (this.Password.length < 8) {
        this.$message({
          type: 'error',
          text: 'Password length must be 8 or more characters',
        });
        return;
      }

      // Check if the Password Matches Confirm Password
      if (this.Password !== this.ConfirmPassword) {
        this.$message({
          type: 'error',
          text: 'Password must match Confirm Password',
        });
        return;
      }

      // this.LoadingStatus = true

      // Make a form
      const Form = {
        first_name: this.FirstName,
        last_name: this.LastName,
        email_address: this.EmailAddress,
        phone_number: this.PhoneNumber,
        password: this.Password,
        confirm_password: this.ConfirmPassword,
      };

      this.loginLoading = true;
      this.$store
        .dispatch('Register', Form)
        .then(() => {
          try {
            this.$router.push({ name: 'Login' });
          } catch (err) {
            this.$router.push({ path: '/login' });
          }
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            text: err.data.message,
          });
        })
        .finally(() => {
          this.loginLoading = false;
        });
    },
    redirectLoginToAnAccount() {
      // alert();
      this.$router.push({ path: '/register' });
    },
  },
  created() {},
};
</script>

<style lang="scss">
@import '../../styles/_login.scss';
</style>
