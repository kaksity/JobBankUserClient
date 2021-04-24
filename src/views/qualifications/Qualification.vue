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
          title="Complete Qualifications By the User"
          toolbar-height="56"
        >
          <template slot="card-content">
            <v-form @submit.prevent="AddQualification">
              <v-container fluid>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md4
                    lg4
                  >
                    <v-text-field
                      v-model="SchoolName"
                      label="Name of School"
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    sm12
                    md4
                    lg4
                  >
                    <v-text-field
                      v-model="CourseName"
                      label="Name of Course"
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    sm12
                    md4
                    lg4
                  >
                    <v-select
                      v-model="EducationLevel"
                      label="Qualification"
                      :items="EducationLevelList"
                      item-text="name"
                      item-value="id"
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
                      v-model="Completed"
                      label="Did you complete it"
                      :items="AreYouStillThereList"
                      item-value="name"
                      item-text="value"
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    sm12
                    md4
                    lg4
                  >
                    <v-select
                      v-model="Grade"
                      label="Grade"
                      :items="GradeList"
                      item-value="value"
                      item-text="text"
                    />
                  </v-flex>
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
                  <v-flex
                    xs12
                    sm12
                    md6
                    lg6
                  >
                    <v-menu
                      ref="AdmissionMenu"
                      v-model="AdmissionMenu"
                      :close-on-content-click="false"
                      :return-value.sync="AdmissionDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{on, attrs}">
                        <v-text-field
                          v-model="AdmissionDate"
                          label="When did you get Admission"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="AdmissionDate"
                        no-title
                        scrollable
                      >
                        <v-spacer />
                        <v-btn
                          text
                          @click="AdmissionMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          @click="$refs.AdmissionMenu.save(AdmissionDate)"
                        >
                          Ok
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex
                    xs12
                    sm12
                    md6
                    lg6
                  >
                    <v-menu
                      ref="GraduationMenu"
                      v-model="GraduationMenu"
                      :close-on-content-click="false"
                      :return-value.sync="GraduationDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{on, attrs}">
                        <v-text-field
                          v-model="GraduationDate"
                          label="When did you graduate"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="GraduationDate"
                        no-title
                        scrollable
                      >
                        <v-spacer />
                        <v-btn
                          text
                          @click="GraduationMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          @click="$refs.GraduationMenu.save(GraduationDate)"
                        >
                          Ok
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-layout wrap row>

                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md12
                    lg12
                  >
                    <v-textarea
                      v-model="AdditionalInfo"
                      outlined
                      label="Additional Information"
                      rows="2"
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
                    <v-btn
                      class="mr-0"
                      type="submit"
                      color="primary"
                    >
                      Add Qualifications
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </template>
        </v-basic-card>
      </v-flex>
      <v-flex>
        <v-basic-card
          mt-2
          title="List Of Qualifications"
          toolbar-height="56"
        >
          <template slot="card-content">
            <v-data-table
              :headers="headers"
              :items="list"
              item-key="name"
              hide-actions
              class="elevation-1"
            >
              <template
                slot="items"
                slot-scope="props"
              >
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.age }}</td>
                <td>{{ props.item.address }}</td>
                <td>
                  <svg-icon
                    class="drag-handler"
                    icon-class="drag"
                  />
                </td>
              </template>
            </v-data-table>
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
      AdmissionDate: new Date().toISOString().substr(0, 10),
      GraduationDate: new Date().toISOString().substr(0, 10),
      AdmissionMenu: false,
      GraduationMenu: false,
      AreYouStillThereList: [{ name: 'YES', value: 'Yes' }, { name: 'NO', value: 'No' }],
      Grade: '',
      GradeList: [{ text: 'First Class', value: 'FIRST CLASS' }, { text: 'Upper Credit', value: 'UPPER CREDIT' }, { text: 'Lower Credit', value: 'LOWER CREDIT' }, { text: 'Credit', value: 'CREDIT' }, { text: 'Pass', value: 'PASS' }, { text: 'Second Class Upper', value: 'SECOND CLASS UPPER' }, { text: 'Second Class Lower', value: 'SECOND CLASS LOWER' }],
      Dialog: false,
      Color: '',
      Message: '',
      EducationLevel: '',
      EducationLevelList: [],
      QualificationsList: [],
      SchoolName: '',
      CourseName: '',
      Completed: '',
      File: null,
      AdditionalInfo: '',

      headers: [
        {
          text: 'Qualification',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Grade',
          value: 'age',
          sortable: false,
          value: 'grade'
        },
        {
          text: 'Start Date',
          value: 'address',
          sortable: false,
          value: 'start_date'
        },
        {
          text: 'Stop Date',
          value: 'drag',
          sortable: false,
          value: 'stop_date'
        },
        {
          text: 'Action',
          value: 'drag',
          sortable: false,
        },
      ],
      list: [
      ],
    };
  },
  methods: {
    setFile (e) {
      // this.File = e
      this.File = e
    },
    FillHighestQualificationSelect() {
      this.$api.GetHighestQualification().then((res) => {
        this.EducationLevelList = res.data;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message
        });
      });
    },
    AddQualification () {
      if (this.SchoolName === '') {
        this.$message({
          type: 'error',
          text: 'School Name is required'
        });
        return;
      } else if (this.CourseName === '') {
        this.$message({
          type: 'error',
          text: 'Course Name is required'
        });
        return;
      } else if (this.EducationLevel === '') {
        this.$message({
          type: 'error',
          text: 'Qualification is required'
        });
        return;
      } else if (this.Completed === '') {
        this.$message({
          type: 'error',
          text: 'Completed Status is required'
        });
        return;
      } else if (this.Grade === '') {
        this.$message({
          type: 'error',
          text: 'Grade is required'
        });
        return;
      } else if (this.File === null) {
        this.$message({
          type: 'error',
          text: 'Qualification Photo is required'
        });
        return;
      } else if (this.File.size > 1048576) {
        this.$message({
          type: 'error',
          text: 'Qualification Photo must be less than 1mb'
        });
        return;
      }

      //console.log(this.File);
      const Fd = new FormData()

      Fd.append('course_name', this.CourseName)
      Fd.append('school_name', this.SchoolName)
      Fd.append('education_level', this.EducationLevel)
      Fd.append('completed', this.Completed)
      Fd.append('grade', this.Grade)
      Fd.append('admission_date', this.AdmissionDate)
      Fd.append('graduation_date', this.GraduationDate)
      Fd.append('file', this.File)
      Fd.append('additional_info', this.AdditionalInfo)

      this.$api.PostQualifications(Fd).then(res => {
        this.$message({
          type: 'success',
          message: res.data.message
        });
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message
        });
      }).finally(() => {
      })
    },
  },
  created(){
    this.FillHighestQualificationSelect();
  }
};
</script>
