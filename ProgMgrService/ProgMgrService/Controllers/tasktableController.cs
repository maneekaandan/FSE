using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccessLayer;

namespace ProgMgrService.Controllers
{
    public class tasktableController : ApiController
    {
        public IEnumerable<taskTable> Get()
        {
            using (DataAccessLayer.masterEntities5 entities = new DataAccessLayer.masterEntities5())
            {
                return entities.taskTables.ToList();
            }
        }

        public HttpResponseMessage Get(int id)
        {
            using (DataAccessLayer.masterEntities5 entities = new DataAccessLayer.masterEntities5())
            {

                var entity = entities.taskTables.FirstOrDefault(ut => ut.taskid == id);

                if (entity != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Task ID " + entity.taskid + " not found");
                }
            }
        }

       [HttpPost]
        public HttpResponseMessage Post([FromBody]taskTable tt)
        {
            try
            {
                using (DataAccessLayer.masterEntities5 entities = new DataAccessLayer.masterEntities5())
                {

                    if (tt.taskid > 0)
                    {
                        entities.taskTables.Add(tt);
                        entities.SaveChanges();


                        var message = Request.CreateResponse(HttpStatusCode.Created, tt);
                        message.Headers.Location = new Uri(Request.RequestUri + "/" + tt.taskid.ToString());
                        return message;
                    }
                    else
                    {
                        var message = Request.CreateResponse(HttpStatusCode.LengthRequired);
                        return message;
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }

        }

        public HttpResponseMessage Put([FromBody]taskTable tt)
        {
            try
            {
                using (DataAccessLayer.masterEntities5 entities = new DataAccessLayer.masterEntities5())
                {
                    var entity = entities.taskTables.FirstOrDefault(u => u.taskid == tt.taskid);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "TaskID = " + tt.taskid.ToString() + " not found to update.");
                    }
                    else
                    {
                        if ( tt.status != null)
                        entity.status = tt.status;

                        if (tt.enddate != null)
                            entity.enddate = tt.enddate;
                        if (tt.startdate != null)
                            entity.startdate = tt.startdate;
                        if (tt.priority != null)
                            entity.priority = tt.priority;
                        if (tt.taskdesc != null)
                            entity.taskdesc = tt.taskdesc;
                        if (tt.projectid != null)
                            entity.projectid = tt.projectid;
                        
                        entities.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK, entity);
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        //------------Testing Methods------------------//

        public int Get4Testing(int all)
        {
            using (DataAccessLayer.masterEntities5 entities = new DataAccessLayer.masterEntities5())
            {
                return entities.taskTables.ToList().Count;
            }
        }

        [ActionName("Post4Testing")]
        public bool Post4Testing(int all)
        {
            taskTable tt = new taskTable();
            tt.projectid = 5;
            try
            {
                using (DataAccessLayer.masterEntities5 entities = new DataAccessLayer.masterEntities5())
                {

                    if (tt.taskid > 0)
                    {
                        entities.taskTables.Add(tt);
                        entities.SaveChanges();


                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                return true;
            }

        }

        public bool Put4Testing(int all)
        {
            taskTable tt = new taskTable();
            tt.projectid = 5;
            tt.priority = 10;
            tt.status = "In Progress";

                using (DataAccessLayer.masterEntities5 entities = new DataAccessLayer.masterEntities5())
                {
                    var entity = entities.taskTables.FirstOrDefault(u => u.taskid == tt.taskid);
                    if (entity == null)
                    {
                        return false;
                    }
                    else
                    {
                        if (tt.status != null)
                            entity.status = tt.status;

                        if (tt.enddate != null)
                            entity.enddate = tt.enddate;
                        if (tt.startdate != null)
                            entity.startdate = tt.startdate;
                        if (tt.priority != null)
                            entity.priority = tt.priority;
                        if (tt.taskdesc != null)
                            entity.taskdesc = tt.taskdesc;
                        if (tt.projectid != null)
                            entity.projectid = tt.projectid;

                        entities.SaveChanges();
                        return true;
                    }
                }
        }


    }
}
