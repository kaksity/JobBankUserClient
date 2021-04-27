<template>
  <v-container
    grid-list-lg
    pa-0
  >
    <v-layout wrap>
      <v-flex
        xs12
        lg12
      >
        <v-basic-card
          title="Complete Profile of User"
          toolbar-height="56"
        >
          <template slot="card-content">
              <v-container fluid>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md4
                    lg4
                  >
                    <v-text-field
                      v-model="FirstName"
                      label="First Name"
                      readonly
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    sm12
                    md4
                    lg4
                  >
                    <v-text-field
                      v-model="MiddleName"
                      label="Middle Name"
                    />
                  </v-flex>

                  <v-flex
                    xs12
                    sm12
                    md4
                    lg4
                  >
                    <v-text-field
                      v-model="LastName"
                      label="Last Name"
                      readonly
                    />
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md4
                    lg4
                  >
                    <v-text-field
                      v-model="PhoneNumber"
                      label="Phone Number"
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    sm12
                    md4
                    lg4
                  >
                    <v-menu
                      ref="DateOfBirthMenu"
                      v-model="DateOfBirthMenu"
                      :close-on-content-click="false"
                      :return-value.sync="DateOfBirth"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{on, attrs}">
                        <v-text-field
                          v-model="DateOfBirth"
                          label="Date of Birth"
                          readonly
                          outlined
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="DateOfBirth"
                        no-title
                        scrollable
                      >
                        <v-spacer />
                        <v-btn
                          text
                          @click="DateOfBirthMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          @click="$refs.DateOfBirthMenu.save(DateOfBirth)"
                        >
                          Ok
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex
                    xs12
                    sm12
                    md4
                    lg4
                  >
                    <v-select
                      v-model="Gender"
                      label="Gender"
                      :items="GenderList"
                      item-text="text"
                      item-value="name"
                    />
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md4
                    lg4
                  >
                    <v-select
                      v-model="HighestEducationLevel"
                      label="Highest Qualification"
                      :items="EducationLevelList"
                      item-text="name"
                      item-value="id"
                    />
                  </v-flex>

                  <v-flex
                    xs12
                    sm12
                    md4
                    lg4
                  >
                    <v-select
                      v-model="MaritalStatus"
                      :items="MaritalStatusList"
                      item-text="text"
                      item-value="name"
                      label="Marital Status"
                    />
                  </v-flex>

                  <v-flex
                    xs12
                    sm12
                    md4
                    lg4
                  >
                    <v-select
                      v-model="EmploymentStatus"
                      :items="EmploymentStatusList"
                      item-text="text"
                      item-value="name"
                      label="Employment Status"
                    />
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md6
                    lg6
                  >
                    <v-text-field
                      label="State Of Origin"
                      value="Borno"
                      readonly
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    sm12
                    md6
                    lg6
                  >
                    <v-select
                      v-model="LGA"
                      label="Local Government Area"
                      :items="LGAList"
                      item-text="name"
                      item-value="id"
                    />
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md6
                    lg6
                  >
                    <v-textarea
                      v-model="ContactAddress"
                      label="Contact Address"
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    sm12
                    md6
                    lg6
                  >
                    <v-textarea
                      v-model="AdditionalInformation"
                      label="Additional Information"
                    />
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex
                    xs12
                    sm12
                    md4
                    lg4
                  >
                    <v-btn
                      color="primary"
                      class="mr-0"
                      @click="UpdateProfile"
                    >
                      Update Profile
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
          </template>
        </v-basic-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'VBarIndex',
  data() {
    return {
      DateOfBirth: new Date().toISOString().substr(0, 10),
      DateOfBirthMenu: false,
      EducationLevel: '',
      LGAList: [],
      EducationLevelList: [],
      GenderList: [{ name: 'MALE', text: 'Male' }, { name: 'FEMALE', text: 'Female' }],
      MaritalStatusList: [{ name: 'SINGLE', text: 'Single' }, { name: 'MARRIED', text: 'Married' }, { name: 'WIDOWED', text: 'Widowed' }, { name: 'DIVORCED', text: 'Divorced' }],
      EmploymentStatusList: [{ name: 'UNEMPLOYED', text: 'Unemployed' }, { name: 'EMPLOYED FULL TIME', text: 'Employed Full Time' }, { name: 'EMPLOYED PART TIME', text: 'Employed Part Time' }, { name: 'ENTREPRENUER', text: 'Entreprenuer' }, { name: 'STARTUP FOUNDER', text: 'Startup Founder' }, { name: 'SELF EMPLOYED', text: 'Self Employed' }, { name: 'STUDENT', text: 'Student' }],
      EmploymentStatus: '',
      MaritalStatus: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      PhoneNumber: '',
      ContactAddress: '',
      AdditionalInformation: '',
      LGA: '',
      Gender: '',
      HighestEducationLevel: '',
    };
  },
  methods: {
    FillLGASelect() {
      this.$api.GetLGA().then((res) => {
        this.LGAList = res.data;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message,
        });
      });
    },
    FillHighestQualificationSelect() {
      this.$api.GetHighestQualification().then((res) => {
        this.EducationLevelList = res.data;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message,
        });
      });
    },
    GetAndFillProfile() {
      this.$api.GetProfile().then((res) => {
        this.FirstName = res.data.first_name;
        this.MiddleName = res.data.middle_name;
        this.LastName = res.data.last_name;
        this.PhoneNumber = res.data.phone_number;
        this.AdditionalInformation = res.data.additional_info;
        this.ContactAddress = res.data.contact_address;
        this.DateOfBirth = res.data.dob;
        this.LGA = res.data.lga;
        this.Gender = res.data.gender;
        this.HighestEducationLevel = res.data.highest_education_level;
        this.MaritalStatus = res.data.marital_status;
        this.EmploymentStatus = res.data.employment_status;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
    UpdateProfile() {
      // Validate all the neccessary fields
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
      } if (this.PhoneNumber === '') {
        this.$message({
          type: 'error',
          text: 'Phone Number is required',
        });
        return;
      } if (this.PhoneNumber.length !== 11) {
        this.$message({
          type: 'error',
          text: 'Phone Number must be 11 digits',
        });
        return;
      } if (this.DateOfBirth === '') {
        this.$message({
          type: 'error',
          text: 'Date of Birth is required',
        });
        return;
      } if (this.Gender === '') {
        this.$message({
          type: 'error',
          text: 'Gender is required',
        });
        return;
      } if (this.HighestEducationLevel === '') {
        this.$message({
          type: 'error',
          text: 'Highest Qualification is required',
        });
        return;
      } if (this.MaritalStatus === '') {
        this.$message({
          type: 'error',
          text: 'Marital Status is required',
        });
        return;
      } if (this.EmploymentStatus === '') {
        this.$message({
          type: 'error',
          text: 'Employment Status is required',
        });
        return;
      } if (this.LGA === '') {
        this.$message({
          type: 'error',
          text: 'Local Government Area is required',
        });
        return;
      } if (this.ContactAddress === '') {
        this.$message({
          type: 'error',
          text: 'Contact Address is required',
        });
        return;
      }

      // this.LoadingStatus = true

      // Construct the form
      const Form = {
        middle_name: this.MiddleName,
        phone_number: this.PhoneNumber,
        date_of_birth: this.DateOfBirth,
        gender: this.Gender,
        highest_education_level: this.HighestEducationLevel,
        marital_status: this.MaritalStatus,
        employment_status: this.EmploymentStatus,
        lga: this.LGA,
        contact_address: this.ContactAddress,
        additional_info: this.AdditionalInformation,
      };

      this.$api.UpdateProfile(Form).then((res) => {
        this.$message({
          text: res.message,
          type: 'success',
        });
        this.GetAndFillProfile();
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message,
        });
      }).finally(() => {
      });
    },
  },
  created() {
    this.FillLGASelect();
    this.FillHighestQualificationSelect();
    this.GetAndFillProfile();
  },
};
</script>
