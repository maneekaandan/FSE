using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccessLayer;

namespace ProgMgrService.Controllers
{
    public class projecttableController : ApiController
    {
        [HttpGet]
        public IEnumerable<projectTable> Get()
        {
            using (DataAccessLayer.masterEntities2 entities = new DataAccessLayer.masterEntities2())
            {
                return entities.projectTables.ToList();
            }
        }

        public HttpResponseMessage Get(int id)
        {
            using (DataAccessLayer.masterEntities2 entities = new DataAccessLayer.masterEntities2())
            {

                var entity = entities.projectTables.FirstOrDefault(pt => pt.projectid == id);

                if (entity != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "User ID " + entity.projectid + " not found");
                }
            }
        }

        public HttpResponseMessage Post([FromBody]projectTable pt)
        {
            try
            {
                using (DataAccessLayer.masterEntities2 entities = new DataAccessLayer.masterEntities2())
                {

                    if (pt.projectid > 0)
                    {
                        entities.projectTables.Add(pt);
                        entities.SaveChanges();


                        var message = Request.CreateResponse(HttpStatusCode.Created, pt);
                        message.Headers.Location = new Uri(Request.RequestUri + "/" + pt.projectid.ToString());
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

        public HttpResponseMessage Delete(int id)
        {
            try
            {
                using (DataAccessLayer.masterEntities2 entities = new DataAccessLayer.masterEntities2())
                {
                    var entity = entities.projectTables.FirstOrDefault(u => u.projectid == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "ProjectId = " + id.ToString() + " not found to delete");
                    }
                    else
                    {
                        entities.projectTables.Remove(entity);
                        entities.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK);
                    }
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }



        public HttpResponseMessage Put([FromBody]projectTable pt)
        {
            try
            {
                using (DataAccessLayer.masterEntities2 entities = new DataAccessLayer.masterEntities2())
                {
                    var entity = entities.projectTables.FirstOrDefault(proj => proj.projectid  == pt.projectid);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "ProjectID = " + pt.projectid.ToString() + " not found to update.");
                    }
                    else
                    {
                        if (pt.projectdesc != null)
                            entity.projectdesc = pt.projectdesc;

                        if (pt.priority != null)
                            entity.priority = pt.priority;

                        if (pt.startdate != null)
                            entity.startdate = pt.startdate;

                        if (pt.enddate != null)
                            entity.enddate = pt.enddate;
                        
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

        //---------------Testing Method------------------//

        [ActionName("Get4Testing")]
        public int Get4Testing(int ptidall)
        {
            using (DataAccessLayer.masterEntities2 entities = new DataAccessLayer.masterEntities2())
            {
                return entities.projectTables.ToList().Count;
            }
        }


        public bool Post4Testing(int all)
        {
            projectTable pt = new projectTable();
            pt.projectid = 10;
            pt.projectdesc = "Testing";
            pt.priority = 12;
            try
            {
                using (DataAccessLayer.masterEntities2 entities = new DataAccessLayer.masterEntities2())
                {

                    if (pt.projectid > 0)
                    {
                        entities.projectTables.Add(pt);
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
                return false;
            }

        }

        public bool Delete4Testing(int delid)
        {
            try
            {
                using (DataAccessLayer.masterEntities2 entities = new DataAccessLayer.masterEntities2())
                {
                    var entity = entities.projectTables.FirstOrDefault(u => u.projectid == delid);
                    if (entity == null)
                    {
                        return false;
                    }
                    else
                    {
                        entities.projectTables.Remove(entity);
                        entities.SaveChanges();
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }



        public bool Put4Testing(int all)
        {
            projectTable pt = new projectTable();
            pt.projectid = 6;
            pt.priority = 19;
            pt.startdate = new DateTime().Date;
            try
            {
                using (DataAccessLayer.masterEntities2 entities = new DataAccessLayer.masterEntities2())
                {
                    var entity = entities.projectTables.FirstOrDefault(proj => proj.projectid == pt.projectid);
                    if (entity == null)
                    {
                        return false;
                    }
                    else
                    {
                        if (pt.projectdesc != null)
                            entity.projectdesc = pt.projectdesc;

                        if (pt.priority != null)
                            entity.priority = pt.priority;

                        if (pt.startdate != null)
                            entity.startdate = pt.startdate;

                        if (pt.enddate != null)
                            entity.enddate = pt.enddate;

                        entities.SaveChanges();
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}
