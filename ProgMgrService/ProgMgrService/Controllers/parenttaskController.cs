using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccessLayer;

namespace ProgMgrService.Controllers
{
    public class parenttaskController : ApiController
    {
        public IEnumerable<parentTask> Get()
        {
            using (DataAccessLayer.masterEntities4 entities = new DataAccessLayer.masterEntities4())
            {
                return entities.parentTasks.ToList();
            }
        }

        public HttpResponseMessage Get(int id)
        {
            using (DataAccessLayer.masterEntities4 entities = new DataAccessLayer.masterEntities4())
            {

                var entity = entities.parentTasks.FirstOrDefault(ut => ut.parentid == id);

                if (entity != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "User ID " + entity.parentid + " not found");
                }
            }
        }

        //-------------Testing Method----------------//

        public int Get4Testing(int all)
        {
            using (DataAccessLayer.masterEntities4 entities = new DataAccessLayer.masterEntities4())
            {
                return entities.parentTasks.ToList().Count;
            }
        }


    }
}
