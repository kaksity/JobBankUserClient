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
          title="Complete Additional Skills By the User"
          toolbar-height="56"
        >
          <template slot="card-content">
            <v-form @submit.prevent="AddSkill">
              <v-container fluid>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    lg12
                  >
                    <v-select
                      v-model="Skill"
                      :items="SkillList"
                      item-text="name"
                      item-value="id"
                      label="Additional Skill Set"
                      color="#fb246a"
                      outlined
                      @change="changeSkill"
                    />
                  </v-flex>
                  <v-flex
                    v-if="SpecifyOthers"
                    xs12
                    sm12
                  >
                    <v-text-field
                      v-model="OtherSkillName"
                      label="Specify Other Skill"
                      color="#fb246a"
                      outlined
                    />
                  </v-flex>
                  <v-flex
                    sm6
                    md6
                  >
                    <v-btn
                      color="primary"
                      block
                      type="submit"
                      class="mr-0"
                    >
                      Add Skill
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
          title="List Of Work Experiences"
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
      Skill: '',
      Message: 'I am Programmer',
      OtherSkillName: '',
      SpecifyOthers: false,
      SkillSetList: [],
      SkillList: [],
      Dialog: false,
      Color: '',
      LoadingStatus: false,

      headers: [
        {
          text: 'Additional Name',
          align: 'left',
          sortable: false,
          value: 'job_title',
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
    changeSkill (i) {
      if (i !== '19') {
        this.SpecifyOthers = false
      } else {
        this.SpecifyOthers = true
      }
    },
    AddSkill () {
      // Check if the a Skill has been selected
      if (this.Skill !== '') {
        let form = {

        }
        if (this.Skill !== '19') {
          form = {
            id: this.Skill,
            name: '',
          }
        } else if (this.Skill === '19' && this.OtherSkillName === '') {
          // Fix this to display a dialog box
          this.$message({
            type: 'error',
            text: 'Specify Other Skills'
          });
        } else {
          form = {
            id: this.Skill,
            name: this.OtherSkillName,
          }
        }

        this.LoadingStatus = true
        postAdditionalSkills(form).then(res => {
          this.LoadingStatus = false
          if (res.success === true) {
            this.Color = 'success'
          } else {
            this.Color = 'error'
          }

          this.Message = res.message
          this.Dialog = true
        })

        setTimeout(() => {
          location.reload()
        }, 1000)
      }
    },
    deleteAdditionalSkill (i) {
      deleteAdditionalSkills(i).then(res => {
        if (res.success === true) {
          this.Color = 'success'
        } else {
          this.Color = 'error'
        }

        this.Message = res.message
        this.Dialog = true
      })
      setTimeout(() => {
        location.reload()
      }, 1000)
    },
  },
  created(){
  }
};
</script>
