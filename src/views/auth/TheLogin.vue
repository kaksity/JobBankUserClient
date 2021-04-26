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
                  Log In
                </h1>
                <v-form>
                  <v-text-field
                    v-model="EmailAddress"
                    prepend-icon="person"
                    clearable
                    label="Email Address"
                    @keyup.enter.native="login"
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
                        @click="redirectCreateANewAccount"
                      >
                        Create a New Account
                      </v-btn>
                      <v-btn
                        flat
                        small
                        color="primary"
                        @click="redirectForgotPassword"
                      >
                        {{ $t('common.forgetPassword') }}
                      </v-btn>
                    </v-flex>
                    <v-flex>
                      <v-btn
                        :loading="loginLoading"
                        @click="login"
                        color="primary"
                      >
                        <span slot="loader">Loading...</span>
                          Log In
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
      EmailAddress: '',
      Password: '',
      loginLoading: false,
    };
  },
  computed: {
    isMobile() {
      return isMobile();
    },
  },
  methods: {
    login() {
      if (this.EmailAddress === '') {
        this.$message({
          type: 'error',
          text: 'Email Address is required',
        });
        return;
      }
      if (this.Password === '') {
        this.$message({
          type: 'error',
          text: 'Password is required',
        });
        return;
      } if (this.Password.length < 8) {
        this.$message({
          type: 'error',
          text: 'Invalid Login Credentials',
        });
        return;
      }

      const Form = {
        email_address: this.EmailAddress,
        password: this.Password,
      };

      this.loginLoading = true;

      this.$store
        .dispatch('Login', Form)
        .then(() => {
          try {
            this.$router.push({ name: 'Index' });
          } catch (err) {
            this.$router.push({ path: '/' });
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
    redirectForgotPassword() {
      console.log('redirectForgotPassword');
      this.$message({
        type: 'info',
        text: 'Ahem: Please add redirect function',
      });
    },
    redirectCreateANewAccount() {
      this.$router.push({ path: '/register' });
    },
  },
  created() {},
};
</script>

<style lang="scss">
@import '../../styles/_login.scss';
</style>
