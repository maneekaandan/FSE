using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccessLayer;


namespace ProgMgrService.Controllers
{
    public class usertableController : ApiController
    {
        public IEnumerable<usersTable> Get()
        {
            using ( DataAccessLayer.masterEntities1 entities = new  DataAccessLayer.masterEntities1())
            {
                return entities.usersTables.ToList();
            }
        }

        public HttpResponseMessage Get(int id)
        {
            using (DataAccessLayer.masterEntities1 entities = new DataAccessLayer.masterEntities1())
            {

                var entity = entities.usersTables.FirstOrDefault(ut => ut.userid == id);

                if ( entity != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "User ID " + entity.userid +" not found");
                }
            }
        }

        public HttpResponseMessage Post([FromBody]usersTable ut)
        {
            try
            {
                using (DataAccessLayer.masterEntities1 entities = new DataAccessLayer.masterEntities1())
                {
                   
                    if (ut.userid > 0)
                    {
                        entities.usersTables.Add(ut);
                        entities.SaveChanges();


                        var message = Request.CreateResponse(HttpStatusCode.Created, ut);
                        message.Headers.Location = new Uri(Request.RequestUri + "/" + ut.userid.ToString());
                        return message;
                    }
                    else
                    {
                        var message = Request.CreateResponse(HttpStatusCode.LengthRequired);
                        return message;
                    }
                }
            } catch ( Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }

        }

        //[HttpPut]
        //public HttpResponseMessage UpdateProjectId([FromBody]usersTable ut)
        //{
        //    try
        //    {
        //        using (DataAccessLayer.masterEntities1 entities = new DataAccessLayer.masterEntities1())
        //        {
        //            var entity = entities.usersTables.FirstOrDefault(u => u.userid == ut.userid);
        //            if (entity == null)
        //            {
        //                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "UserId = " + ut.userid + " not found to update.");
        //            }
        //            else
        //            {
                        
        //                entity.projectid = ut.projectid;
        //                entities.SaveChanges();
        //                return Request.CreateResponse(HttpStatusCode.OK, entity);
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
        //    }
        //}

        public HttpResponseMessage Put([FromBody]usersTable ut)
        {
            try
            {
                using (DataAccessLayer.masterEntities1 entities = new DataAccessLayer.masterEntities1())
                {
                    var entity = entities.usersTables.FirstOrDefault(u => u.userid == ut.userid);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "UserId = " + ut.userid.ToString() + " not found to update.");
                    }
                    else
                    {
                        if (ut.firstname != null)
                            entity.firstname = ut.firstname;
                      
                        if (ut.lastname != null)  
                            entity.lastname = ut.lastname;

                        if (ut.employeeid != null)
                            entity.employeeid = ut.employeeid;

                        if (ut.projectid != null)
                            entity.projectid = ut.projectid;

                        if(ut.taskid != null)
                            entity.taskid = ut.taskid;

                        entities.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK, entity);
                    }
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        public HttpResponseMessage Delete(int id)
        {
            try
            {
                using (DataAccessLayer.masterEntities1 entities = new DataAccessLayer.masterEntities1())
                {
                    var entity = entities.usersTables.FirstOrDefault(u => u.userid == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "UserID = " + id.ToString() + " not found to delete");
                    }
                    else
                    {
                        entities.usersTables.Remove(entity);
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


        //--------------For Testing Methods---------------------//

        [ActionName("Post4Testing")]
        public bool Post4Testing(int all)
        {
            usersTable ut = new usersTable();
            ut.userid = 5;
            try
            {
                using (DataAccessLayer.masterEntities1 entities = new DataAccessLayer.masterEntities1())
                {

                    if (ut.userid > 0)
                    {
                        entities.usersTables.Add(ut);
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

        [ActionName("Put4Testing")]
        public bool Put4Testing(int all)
        {
            usersTable ut = new usersTable();
            ut.userid = 5;
            ut.firstname = "Testing1";
            ut.lastname = "Testing1";
            ut.employeeid = 0;
            try
            {
                using (DataAccessLayer.masterEntities1 entities = new DataAccessLayer.masterEntities1())
                {
                    var entity = entities.usersTables.FirstOrDefault(u => u.userid == ut.userid);
                    if (entity == null)
                    {
                        return false;
                    }
                    else
                    {
                        if (ut.firstname != null)
                            entity.firstname = ut.firstname;

                        if (ut.lastname != null)
                            entity.lastname = ut.lastname;

                        if (ut.employeeid != null)
                            entity.employeeid = ut.employeeid;

                        if (ut.projectid != null)
                            entity.projectid = ut.projectid;

                        if (ut.taskid != null)
                            entity.taskid = ut.taskid;

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

        public bool GetbyRow4Testing(int userid)
        {
            using (DataAccessLayer.masterEntities1 entities = new DataAccessLayer.masterEntities1())
            {

                var entity = entities.usersTables.FirstOrDefault(ut => ut.userid == userid);

                if (entity != null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }

        public bool Delete4Testing(int deleteRow)
        {
            
            try
            {
                using (DataAccessLayer.masterEntities1 entities = new DataAccessLayer.masterEntities1())
                {
                    var entity = entities.usersTables.FirstOrDefault(u => u.userid == deleteRow);
                    if (entity == null)
                    {
                        return false;
                    }
                    else
                    {
                        entities.usersTables.Remove(entity);
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
