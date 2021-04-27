<template>
  <v-container
    grid-list-lg
    pa-0
  >
    <v-layout wrap>
      <v-flex
        xs12
        sm6
        md6
        lg6
      >
        <v-basic-card
          title="Upload your Photo"
          toolbar-height="56"
        >
          <template slot="card-content">
            <v-layout
              row
              wrap
            >
              <v-flex
                xs12
                sm6
                md8
                layout
                align-center
                justify-center
                text-xs-center
              >
                <v-avatar
                  :size="256"
                  color="grey lighten-4"
                >
                  <img
                    :src="PhotoURL"
                    alt="avatar"
                  >
                </v-avatar>
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap
            >
              <v-flex
                xs12
                sm12
                md4
                lg4
              >
                <input
                  type="file"
                  ref="file"
                  label="Upload your Qualifications"
                  clearable="true"
                  @change="setFile"
                />
              </v-flex>
            </v-layout>
            <v-layout wrap row>
              <v-flex>
                <v-btn
                  color="primary"
                  @click="UploadPassport"
                >
                  Upload Passport
                </v-btn>
              </v-flex>
            </v-layout>
          </template>
        </v-basic-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Passport',
  data() {
    return {
      PhotoURL: '',
      File: null,
    };
  },
  methods: {
    GetPassport() {
      this.$api.GetPassport().then((res) => {
        this.PhotoURL = res.data.link;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
    setFile(e) {
      // this.File = e
      this.File = e;
      console.log(this.File);
    },
    UploadPassport() {
      if (this.File === null) {
        this.$message({
          type: 'error',
          text: 'Passport Photo is required',
        });
        return;
      }
      if (this.File.size > 1048576) {
        this.$message({
          type: 'error',
          text: 'Passport Photo must be less than 1mb',
        });
        return;
      }
      this.$api.PutUploadPassport(this.File.currentTarget).then((res) => {
        this.$message({
          type: 'success',
          text: res.message,
        });
        this.GetPassport();
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
  },
  created() {
    this.GetPassport();
  },
};
</script>
